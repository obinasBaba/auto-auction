-- CreateEnum
CREATE TYPE "auction_status" AS ENUM ('ACTIVE', 'ENDED');

-- CreateEnum
CREATE TYPE "condition" AS ENUM ('used', 'new');

-- CreateEnum
CREATE TYPE "drivetrain" AS ENUM ('all-wheel-drive (AWD)', 'front-wheel-drive (FWD)', 'rear-wheel-drive(RWD)', 'four-wheel-drive(4WD)');

-- CreateEnum
CREATE TYPE "features" AS ENUM ('Seat heater', 'Leather seats', 'Navigation system', 'Air conditioner', 'Parking control', 'Rear view camera', 'Multimedia system', 'Central lock', 'Alloy Wheels', 'diesel');

-- CreateEnum
CREATE TYPE "fuel" AS ENUM ('gasoline', 'diesel');

-- CreateEnum
CREATE TYPE "gearbox" AS ENUM ('manual', 'automatic');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "country" TEXT,
    "zipcode" SMALLINT,
    "city" VARCHAR(15),
    "street_address" TEXT,
    "vehicle_id" INTEGER NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auction" (
    "id" SERIAL NOT NULL,
    "dealer_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "winner_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "starting_bid" DECIMAL(10,2) NOT NULL,
    "current_price" DECIMAL(10,2) NOT NULL,
    "starting_date" TIMESTAMP(6) NOT NULL,
    "ending_date" TIMESTAMP(6),
    "status" "auction_status" NOT NULL,
    "highest_bid" DECIMAL(10,2) NOT NULL,
    "reserve_price" INTEGER NOT NULL,

    CONSTRAINT "auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bid" (
    "id" SERIAL NOT NULL,
    "auction_id" INTEGER NOT NULL,
    "dealer_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_engine" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "fuel" "fuel",
    "cylinder_count" SMALLINT,

    CONSTRAINT "car_engine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_make" (
    "id" SERIAL NOT NULL,
    "logo_url" TEXT,
    "detail" TEXT,
    "name" TEXT,

    CONSTRAINT "car_make_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_model" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "car_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "car_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" SERIAL NOT NULL,
    "vin" TEXT NOT NULL,
    "make_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "model_id" INTEGER NOT NULL,
    "engine_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "dealer_id" INTEGER NOT NULL,
    "condition" "condition",
    "gearbox" "gearbox",
    "drivetrain" "drivetrain",
    "name" TEXT,
    "listing_title" TEXT,
    "description" TEXT,
    "price" INTEGER,
    "year" SMALLINT,
    "mileage" INTEGER,
    "body_color" VARCHAR(10),
    "interior_color" VARCHAR(10),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_vin_key" ON "vehicle"("vin");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auction" ADD CONSTRAINT "auction_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auction" ADD CONSTRAINT "auction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bid" ADD CONSTRAINT "bid_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "fk_address" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_engine_id_fkey" FOREIGN KEY ("engine_id") REFERENCES "car_engine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "car_make"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "car_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "car_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
