import multer from 'multer';
import fs from 'fs';

const diskStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const fileName = file.originalname;
    const path = `images/${fileName}`;
    const error = fs.existsSync(path)
      ? new Error('Image with that name already exist!')
      : null;
    cb(error, 'images');
  },
  filename: (req: any, file: any, cb: any) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];

    const fileName = file.originalname;
    cb(null, fileName);

  },
},
);

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single('image');

export default storage