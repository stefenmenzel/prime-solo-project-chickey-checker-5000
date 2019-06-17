CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"email" VARCHAR (255) NOT NULL,
	"coop_id" INT-- REFERENCES "user_devices"
);

ALTER TABLE "user"
ADD "phone_number" varchar(10);

ALTER TABLE "user"
ADD "first_name" varchar(255);

ALTER TABLE "user"
ADD "last_name" varchar(255);

ALTER TABLE "user"
ADD "coop_id" INT REFERENCES "user_devices";

ALTER TABLE "user"
DROP COLUMN "phone_number";

ALTER TABLE "user"
DROP COLUMN "coop_id";

CREATE TABLE "devices" (
	"id" SERIAL PRIMARY KEY,
	"device_name" VARCHAR (255)
);

CREATE TABLE "user_devices" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"device_id" INT REFERENCES "devices"
);

CREATE TABLE "sensor_metrics"(
	"id" SERIAL PRIMARY KEY,
	"metric" VARCHAR (255)
);

CREATE TABLE "alerts" (
	"id" SERIAL PRIMARY KEY,
	"metric_id" INT REFERENCES "sensor_metrics",
	"condition" VARCHAR(2),
	"value" decimal,
	"user_id" INT REFERENCES "user"
);

ALTER TABLE "alerts"
ADD COLUMN "email" BOOLEAN default true;

ALTER TABLE "alerts"
ADD COLUMN "phone" BOOLEAN default false;

ALTER TABLE "alerts"
ADD COLUMN "active" BOOLEAN default false;

SELECT "alerts".id, "sensor_metrics".metric, "alerts".condition, "alerts".value,
"alerts".active, "alerts".email, "alerts".phone
FROM "alerts"
JOIN "sensor_metrics" on "alerts".metric_id = "sensor_metrics".id;

UPDATE "alerts"
SET "active" = NOT "active"
WHERE "id" = 3;

CREATE TABLE "readings" (
	"id" SERIAL PRIMARY KEY,
	"date_time" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
	 "temp" INTEGER,
	 "light" decimal,
	 "humidity" decimal, 
	 "heatIndex" INTEGER,
	 "coop_id" INT REFERENCES "devices"
);

DROP TABLE "readings";

INSERT INTO "user_devices" (user_id, device_id)
SELECT 14, 1
WHERE NOT EXISTS(
	SELECT * FROM "user_devices"
	WHERE(
		"user_id" = 14
		AND
		"device_id" = 1
	)
)
RETURNING "id";

SHOW TIMEZONE;

SELECT now();
select now()::timestamp;

select * FROM "readings"
WHERE "date_time" between '2019-05-30' AND '2019-05-31';

select date_part('year', now());


SELECT * FROM "readings"
WHERE date_part('year', "date_time") = (date_part('year', now())-1)
AND date_part('month', "date_time") = (date_part('month', now()));