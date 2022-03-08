/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-plusplus */
import React from 'react'
import classNames from 'classnames'
import { useField } from 'formik'
import { useDropzone } from 'react-dropzone'
import WithFormik from '../FormicApp/WithFormik'
import ErrorFeedback from '@/components/atoms/ErrorFeedback'
import Print from '@/components/atoms/Print'
import Icons from '@/components/icons/Icons'
import Api from '@/services/ApiService'

let currentId = 0

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId
}

/**
 *
 * @param {*} param0
 * @returns
 * @src:ui https://tailwindcomponents.com/component/tailwind-file-upload
 * @src:logic https://github.com/bmvantunes/youtube-2021-feb-multiple-file-upload-formik
 */
function FilesUpload({
  name = 'files',
  files,
  setFiles,
  label,
  error,
  className,
  isRequired,
  placeholder,
  onChange = () => {},
  ...inputProps
}) {
  // const [files, setFiles] = React.useState([])

  React.useEffect(() => {
    onChange(files)
  }, [files, onChange])

  const onDrop = React.useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map((file) => ({
      ...file,
      blob: file,
      errors: [],
      id: getNewId(),
    }))
    setFiles((curr) => [...curr, ...mappedAcc])
  }, [])

  // function onUpload(file, url) {
  //   setFiles((filesMeta) =>
  //     filesMeta.map((fw) => {
  //       if (fw.file === file) {
  //         return { ...fw, url }
  //       }
  //       return fw
  //     }),
  //   )
  // }

  function onDelete(file) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file))
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // maxSize: 300 * 1024, // 300KB
    // accept: ['image/*', 'video/*', '.pdf'],
  })

  const onSubmit = () => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append(`${name}[]`, file.blob, file.name)
    })

    Api.test.fileUpload(2, formData).then((res) => {
      console.log(res)
    })
  }

  return (
    <div className={classNames('flex flex-col mt-2 ', className)}>
      <label
        className={classNames(
          'flex items-center mb-1 text-gray-600 dark:text-gray-300',
        )}
        htmlFor={name}
      >
        {label} {isRequired && <span className="pl-1 text-red-300"> *</span>}
      </label>

      <div
        {...getRootProps({})}
        className={classNames([
          'relative flex flex-col items-center w-64 px-4 py-4 tracking-wide text-gray-600 bg-white dark:bg-gray-800 dark:border-gray-600 border rounded-lg shadow-md cursor-pointer dark:text-gray-300 text-blue border-blue hover:bg-blue hover:text-gray-800',
          error &&
            'text-red-400  bg-red-100/80 hover:bg-red-100/80 active:bg-red-100/80 focus:bg-red-100/80',
        ])}
      >
        <input {...getInputProps()} className="bg-red-300" />
        <label onDragOver={(e) => e.preventDefault()}>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </label>
      </div>

      {files.map((fileWrapper) => (
        <div key={fileWrapper.id} className="relative p-3 my-2 border">
          {!fileWrapper.errors.length && (
            <div>
              <span>{fileWrapper?.path}</span>
              <button
                onClick={() => onDelete(fileWrapper.file)}
                className="absolute p-2 text-gray-400 rounded-lg right-5 hover:text-red-700 "
              >
                <Icons.Delete />
              </button>
            </div>
          )}
        </div>
      ))}

      <ErrorFeedback error={error} />

      <button type="button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  )
}

export default FilesUpload

export const FilesUploadFormik = ({ ...props }, ...rest) => (
  <WithFormik inputAs={FilesUpload} {...props} /> // {...(rest || {})}
)

// const fileInit = {
//   file: null,
//   name: null,
//   size: null,
//   type: null,
// }
