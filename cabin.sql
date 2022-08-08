-- Creating Table
CREATE TABLE cabin(
    id NUMBER NOT NULL,
    brand VARCHAR2(20) NOT NULL,
    rooms NUMBER NOT NULL,
    category_id NUMBER NOT NULL,
    name VARCHAR2(400) NOT NULL,
    PRIMARY KEY (id)
);

-- Creating sequence
CREATE SEQUENCE cabin_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER cabin_seq_tr
BEFORE INSERT ON cabin FOR EACH ROW
WHEN(new.id IS NULL)
BEGIN
    SELECT cabin_seq.NEXTVAL INTO :NEW.id FROM DUAL;
END;

-- Delete table and sequence
DROP TABLE cabin
DROP SEQUENCE cabin_seq
-- Clear table
TRUNCATE TABLE cabin

-- Show database content
SELECT * FROM cabin




-- Methods implementation
-- base url: https://g652512b33ec820-alquilercabanas.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/cabin/cabin
 
-- GET "Consultar"
SELECT * FROM CABIN ORDER BY ID ASC
 
 
-- POST "Crear"
BEGIN
	INSERT INTO CABIN (ID,BRAND,ROOMS,CATEGORY_ID,NAME)  VALUES (:id,:brand,:rooms,:category_id,:name);
	:status_code := 201;
END;


-- PUT  "Actualizar"
BEGIN
    UPDATE CABIN SET BRAND = :brand, ROOMS = :rooms, CATEGORY_ID = :category_id, NAME = :name where ID = :id;
    :status_code := 201;
END;



-- DELETE  "Eliminar"
BEGIN
	DELETE FROM CABIN WHERE ID = :id;
	:status_code := 204;
END;


-- GET "Consultar por ID"
SELECT * FROM CABIN WHERE ID = :id ORDER BY ID ASC