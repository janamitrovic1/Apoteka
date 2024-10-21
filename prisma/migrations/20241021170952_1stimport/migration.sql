-- CreateTable
CREATE TABLE `Bills` (
    `bill_id` VARCHAR(191) NOT NULL,
    `med_count1` INTEGER NOT NULL DEFAULT 0,
    `med_count2` INTEGER NOT NULL DEFAULT 0,
    `med_count3` INTEGER NOT NULL DEFAULT 0,
    `heard_from` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`bill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicines` (
    `medicine_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,

    PRIMARY KEY (`medicine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
