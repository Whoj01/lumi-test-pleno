-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "qrcode" DROP NOT NULL,
ALTER COLUMN "qrcodeKey" DROP NOT NULL,
ALTER COLUMN "pix" DROP NOT NULL;
