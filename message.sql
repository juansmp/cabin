-- Creating Table
CREATE TABLE message(
    id NUMBER NOT NULL,
    messagetext VARCHAR2(4000) NOT NULL,
    PRIMARY KEY (id)
);

-- Creating sequence
CREATE SEQUENCE message_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER message_seq_tr
BEFORE INSERT ON message FOR EACH ROW
WHEN(new.id IS NULL)
BEGIN
    SELECT message_seq.NEXTVAL INTO :NEW.id FROM DUAL;
END;

-- Delete table and sequence
DROP TABLE message
DROP SEQUENCE message_seq
-- Clear table
TRUNCATE TABLE message

-- Show database content
SELECT * FROM message




-- Methods implementation
-- base url: https://g652512b33ec820-alquilercabanas.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/message/message
 
-- GET "Consultar"
SELECT * FROM MESSAGE ORDER BY ID ASC
 
 
-- POST "Crear"
BEGIN
	INSERT INTO MESSAGE (ID,MESSAGETEXT)  VALUES (:id,:messagetext);
	:status_code := 201;
END;


-- PUT  "Actualizar"
BEGIN
    UPDATE MESSAGE SET MESSAGETEXT = :messagetext where ID = :id;
    :status_code := 201;
END;



-- DELETE  "Eliminar"
BEGIN
	DELETE FROM MESSAGE WHERE ID = :id;
	:status_code := 204;
END;


-- GET "Consultar por ID"
SELECT * FROM MESSAGE WHERE ID = :id ORDER BY ID ASC