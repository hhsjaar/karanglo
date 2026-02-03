-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageProfile" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "name" TEXT NOT NULL DEFAULT 'Desa Karanglo',
    "description" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "areaSize" DOUBLE PRECISION NOT NULL,
    "populationCount" INTEGER NOT NULL,
    "idmStatus" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "socialMedia" JSONB,
    "structure" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VillageProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemographicStat" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DemographicStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Potency" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "thumbnail" TEXT,
    "content" TEXT NOT NULL,
    "location" TEXT,
    "contact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Potency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdmRecord" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "scoreIks" DOUBLE PRECISION NOT NULL,
    "scoreIke" DOUBLE PRECISION NOT NULL,
    "scoreIkl" DOUBLE PRECISION NOT NULL,
    "scoreTotal" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdmRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" TEXT,
    "images" TEXT[],
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attachment" TEXT,
    "response" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PpdidFile" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PpdidFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "DemographicStat_category_label_year_key" ON "DemographicStat"("category", "label", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Potency_slug_key" ON "Potency"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "IdmRecord_year_key" ON "IdmRecord"("year");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_slug_key" ON "Activity"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Complaint_ticketId_key" ON "Complaint"("ticketId");
