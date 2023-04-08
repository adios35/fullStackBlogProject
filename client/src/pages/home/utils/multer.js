import multer from "multer";

const multerMiddleware = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});

export default multerMiddleware;
