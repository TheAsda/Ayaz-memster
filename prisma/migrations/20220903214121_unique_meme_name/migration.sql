/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Meme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Meme_name_key" ON "Meme"("name");
