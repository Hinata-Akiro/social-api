import { Request } from 'express';
const multer = require('multer');
const path = require('path');

const fileFilter = (
  req: Request,
  file: { originalname: string },
  cb: (arg0: Error | null, arg1: boolean) => void,
) => {
  let ext = path.extname(file.originalname);
  if (
    ext !== '.mp4' &&
    ext !== '.mkv' &&
    ext !== '.jpeg' &&
    ext !== '.jpg' &&
    ext !== '.png'
  ) {
    cb(new Error('File type is not supported'), false);
    return;
  }
  cb(null, true);
};

export default multer({
  storage: multer.diskStorage({}),
  fileFilter,
});