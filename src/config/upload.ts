import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempFolder = resolve(__dirname, '..', '..', 'temp');

export default {
  diretorio: tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
