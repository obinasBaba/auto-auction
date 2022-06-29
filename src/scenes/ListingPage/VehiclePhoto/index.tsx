import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import s from './uploadphotos.module.scss';
import { Button, IconButton } from '@mui/material';
import { Close, CloudUpload } from '@mui/icons-material';
import clsx from 'clsx';
import axios from 'axios';

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
  progress: number;
  preview: string;
  loaded: boolean;
};

function Previews({ values, setValues, setFieldValue }: any) {
  const [imagePreviews, setImagePreviews] = useState<Preview[]>(values.images);

  const [imgs, setImgs] = useState<{ url: string; id: string; name: string }[]>(
    [],
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const addImg = (img: Preview) => {
    // setFiles((files) => [...files, img]);
  };

  const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
    maxFiles: 10,
    multiple: true,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': [],
    },

    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        const newImg = {
          name: `${imagePreviews.length}-${file.name}`,
          id: '',
          url: '',
          progress: 0,
          preview: URL.createObjectURL(file),
          loaded: false,
        };

        setImagePreviews((prevState) => [...prevState, newImg]);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'auction-preset');

        axios
          .request({
            method: 'POST',
            url: 'https://api.cloudinary.com/v1_1/dltkxbnvk/image/upload',
            data: formData,
            onUploadProgress(p) {
              const progress = map(p?.loaded, 0, p?.total, 0, 1);
              setImagePreviews((prevState) =>
                prevState.map((preview) =>
                  preview.name === newImg.name
                    ? {
                        ...preview,
                        progress,
                      }
                    : preview,
                ),
              );

              console.log('prog: ', progress);
            },
          })
          .then((d) => {
            setImagePreviews((prevState) =>
              prevState.map((preview) =>
                preview.name === newImg.name
                  ? {
                      ...preview,
                      id: d.data?.asset_id,
                      url: d.data?.secure_url,
                      loaded: true,
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
  }, [imagePreviews]);

  useEffect(() => {
    console.log('images-chagned: ', values.images);
    // setImgs(values.images);
  }, [values.images]);

  useEffect(() => {
    // setImagePreviews(values.images)
    return () => {
      console.log('invoking urlObjurl');
      imagePreviews.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, []);

  return (
    <section className={s.container}>
      <h3>Upload listing photos</h3>

      <div className="wrapper">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input
            {...getInputProps()}
            id="file_"
            ref={inputRef}
            name="images[0]"
          />

          <div
            className={clsx('guide guid_bottom', [
              s.bottom && imagePreviews.length,
            ])}
          >
            <Button
              variant="contained"
              size="large"
              type="button"
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
        </div>
        <aside className="preview_list">
          {imagePreviews.map((preview) => (
            <div key={preview.name}>
              <div className="preview">
                <img
                  src={preview.loaded ? preview.url : preview.preview}
                  alt={preview.name}
                  // Revoke data uri after image is loaded
                  onLoad={() => {
                    URL.revokeObjectURL(preview.preview);
                  }}
                />

                <IconButton className="close_btn">
                  {preview.loaded ? <Close /> : <p>{preview.progress}</p>}
                </IconButton>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

export default Previews;
