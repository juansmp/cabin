-- Creating Table
CREATE TABLE category(
    id NUMBER NOT NULL,
    name VARCHAR2(45) NOT NULL,
    description VARCHAR2(250) NOT NULL,
    PRIMARY KEY (id)
);

-- Creating sequence
CREATE SEQUENCE category_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER category_seq_tr
BEFORE INSERT ON category FOR EACH ROW
WHEN(new.id IS NULL)
BEGIN
    SELECT category_seq.NEXTVAL INTO :NEW.id FROM DUAL;
END;

-- Delete table and sequence
DROP TABLE category
DROP SEQUENCE category_seq
-- Clear table
TRUNCATE TABLE category

-- Show database content
SELECT * FROM category




-- Methods implementation
-- base url: https://g652512b33ec820-alquilercabanas.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/category/category
 
-- GET "Consultar"
SELECT * FROM CATEGORY ORDER BY ID ASC
 
 
-- POST "Crear"
BEGIN
	INSERT INTO CATEGORY (ID,NAME,DESCRIPTION)  VALUES (:id,:name,:description);
	:status_code := 201;
END;


-- PUT  "Actualizar"
BEGIN
    UPDATE CATEGORY SET NAME = :name, DESCRIPTION = :description where ID = :id;
    :status_code := 201;
END;



-- DELETE  "Eliminar"
BEGIN
	DELETE FROM CATEGORY WHERE ID = :id;
	:status_code := 204;
END;


-- GET "Consultar por ID"
SELECT * FROM CATEGORY WHERE ID = :id ORDER BY ID ASC