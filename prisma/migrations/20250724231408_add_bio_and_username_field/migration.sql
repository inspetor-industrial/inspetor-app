-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bio" TEXT DEFAULT '',
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE INDEX "user_username_idx" ON "user"("username");
