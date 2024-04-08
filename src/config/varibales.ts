import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  redisUrl: process.env.redisURL as string,
  sessionSecret: process.env.SESSION_SECRET as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string
};

export default config;