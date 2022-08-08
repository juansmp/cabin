-- Creating Table
CREATE TABLE client(
    id NUMBER NOT NULL,
    name VARCHAR(4000) NOT NULL,
    email VARCHAR2(20) NOT NULL,
	age NUMBER NOT NULL,    
    PRIMARY KEY (id)
);

-- Creating sequence
CREATE SEQUENCE client_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER client_seq_tr
BEFORE INSERT ON client FOR EACH ROW
WHEN(new.id IS NULL)
BEGIN
    SELECT client_seq.NEXTVAL INTO :NEW.id FROM DUAL;
END;

-- Delete table and sequence
DROP TABLE client
DROP SEQUENCE client_seq
-- Clear table
TRUNCATE TABLE client

-- Show database content
SELECT * FROM client




-- Methods implementation
-- base url: https://g652512b33ec820-alquilercabanas.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/client/client
 
-- GET "Consultar"
SELECT * FROM CLIENT ORDER BY ID ASC
 
-- POST "Crear"
BEGIN
	INSERT INTO CLIENT (ID,NAME,EMAIL,AGE)  VALUES (:id,:name,:email,:age);
	:status_code := 201;
END;


-- PUT  "Actualizar"
BEGIN
    UPDATE CLIENT SET NAME = :name, EMAIL = :email, AGE = :age where ID = :id;
    :status_code := 201;
END;



-- DELETE  "Eliminar"
BEGIN
	DELETE FROM CLIENT WHERE ID = :id;
	:status_code := 204;
END;


-- GET "Consultar por ID"
SELECT * FROM CLIENT WHERE ID = :id ORDER BY ID ASC