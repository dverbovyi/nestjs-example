-- CreateTable
CREATE TABLE "Cat" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);
