import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import s from './uploadphotos.module.scss';
import { Button, IconButton } from '@mui/material';
import { Close, CloudUpload } from '@mui/icons-material';
import clsx from 'clsx';
import axios from 'axios';
import { StepHeader } from '@/scenes/ListingPage/components';
import { ListingFormStepComponent } from '@/scenes/ListingPage';
import ProgressCircle from '@/components/ProgressCircle';
import { MotionValue } from 'framer-motion';
import { useAppContext } from '@/context';
import Image from 'next/image';
/*import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dltkxbnvk',
  api_key: '577792539154293',
  api_secret: 'vLVZ03z1OdkFA8lzjuUK9AvD85I',
  secure: true,

})*/

export const map = (
  value: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number,
) => ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

type Preview = {
  name: string;
  id: string;
  url: string;
  progress: MotionValue<number>;
  preview: string;
  loaded: boolean;
};

const Previews: ListingFormStepComponent = ({
  formikProps,
  uploadPath,
  title,
}) => {
  const { values, setFieldValue } = formikProps;

  const [imagePreviews, setImagePreviews] = useState<Preview[]>(values.images);
  const { currentUser } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const [dragEnter, setDragEnter] = useState(false);

  const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
    maxFiles: 10,
    multiple: true,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': [],
    },
    onDragOver: () => setDragEnter(true),
    onDragLeave: () => setDragEnter(false),

    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        const newImg = {
          name: `${imagePreviews.length}-${file.name}`,
          id: '',
          url: '',
          progress: new MotionValue(0),
          preview: URL.createObjectURL(file),
          loaded: false,
        };

        setImagePreviews((prevState) => [...prevState, newImg]);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'auction-preset');
        formData.append('resource_type', 'image');
        formData.append(
          'public_id',
          // 'henokgetachew500@gmail_com/' + newImg.name,
          `${currentUser?.email}_${
            uploadPath || values.itemDetail.name.replace(' ', '_')
          }/${newImg.name}`,
        );

        // cloudinary.v1.uploader.upload('', {})

        axios
          .request({
            method: 'POST',
            url: 'https://api.cloudinary.com/v1_1/dltkxbnvk/image/upload',
            data: formData,
            onUploadProgress(p) {
              newImg.progress.set(map(p?.loaded, 0, p?.total, 0, 1));
              // update the progress
              setImagePreviews((prevState) =>
                prevState.map((prevItems) =>
                  prevItems.name === newImg.name
                    ? {
                        ...prevItems,
                      }
                    : prevItems,
                ),
              );
            },
          })
          .then((d) => {
            setTimeout(() =>
              imagePreviews.forEach(({ preview }) =>
                URL.revokeObjectURL(preview),
              ),
            );
            setImagePreviews((prevState) =>
              prevState.map((preview) =>
                preview.name === newImg.name
                  ? {
                      ...preview,
                      id: d.data?.asset_id,
                      url: d.data?.secure_url,
                    }
                  : preview,
              ),
            );

            console.log('finish uplaoding: ', imagePreviews);
          });
      }
    },
  });

  useEffect(() => {
    setFieldValue('images', imagePreviews);
  }, [imagePreviews, setFieldValue]);

  return (
    <section className={s.container}>
      <StepHeader text={title || 'Upload listing photos'} />

      <div className="wrapper">
        <aside className="preview_wrapper">
          <div
            {...getRootProps({
              className: clsx(['dropzone', { enter: dragEnter }]),
            })}
          >
            <input
              {...getInputProps()}
              id="file_"
              ref={inputRef}
              name="images[0]"
            />
          </div>
          <div className="preview_list">
            {imagePreviews.map((preview) => (
              <div key={preview.name}>
                <div className="preview">
                  <Image
                    src={preview.url || preview.preview}
                    layout="fill"
                    alt={preview.name}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                      URL.revokeObjectURL(preview.preview);
                    }}
                  />

                  <IconButton className="close_btn" color="primary">
                    {preview.url ? (
                      <Close
                        onClick={() => {
                          setImagePreviews(
                            imagePreviews.filter(({ id }) => id != preview.id),
                          );
                        }}
                      />
                    ) : (
                      <ProgressCircle
                        progress={preview.progress}
                        onClick={() => {
                          setImagePreviews(
                            imagePreviews.filter(({ id }) => id != preview.id),
                          );
                        }}
                      />
                    )}
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          <div
            className={clsx('guide guid_bottom', [
              s.bottom && imagePreviews.length,
            ])}
          >
            <Button
              variant="contained"
              size="large"
              type="button"
              className="upload_photo_btn"
              startIcon={<CloudUpload />}
              onClick={() => inputRef.current?.click()}
            >
              Upload Photos
            </Button>

            {imagePreviews.length === 0 && (
              <>
                <p>or</p>
                <p style={{ marginTop: 0 }}>Drag drop some files here</p>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Previews;
