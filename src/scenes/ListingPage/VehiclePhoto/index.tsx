import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import s from './uploadphotos.module.scss';
import { Button, IconButton } from '@mui/material';
import { Close, CloudUpload } from '@mui/icons-material';
import clsx from 'clsx';
import { ControlButtons } from '@/scenes/ListingPage/components';

function Previews(props: any) {
  const [files, setFiles] = useState<{ preview: string; name: string }[]>([]);
  const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
    maxFiles: 20,
    multiple: true,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      console.log('accep: ', acceptedFiles);
      setFiles((file) => [
        ...file,
        ...acceptedFiles.map((file) => ({
          name: file.name,
          preview: URL.createObjectURL(file),
        })),
      ]);
    },
  });

  useEffect(() => {
    console.log('acceptedFiles: ', acceptedFiles);
    console.log('previews :', files);

    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [acceptedFiles]);

  return (
    <section className={s.container}>
      <h3>Upload listing photos</h3>

      <div className="wrapper">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />

          <div
            className={clsx('guide guid_bottom', [s.bottom && files.length])}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<CloudUpload />}
              onClick={open}
            >
              Upload Photos
            </Button>

            {files.length === 0 && (
              <>
                <p>or</p>
                <p>Drag drop some files here</p>
              </>
            )}
          </div>
        </div>
        <aside className="preview_list">
          {files.map((file) => (
            <div key={file.name}>
              <div className="preview">
                <img
                  src={file.preview}
                  alt={file.name}
                  // Revoke data uri after image is loaded
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
                <IconButton className="close_btn">
                  <Close />
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
