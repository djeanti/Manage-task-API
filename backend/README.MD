Step 1: creating a local API and store the data in a json file tasks.json so that the data is not lost
fastapi : pour créer l’API
uvicorn : pour lancer un serveur local

Step 2: Create the database to replace tasks.json in SQL shell

Pour que cela marche il faut ajouter C:\Program Files\PostgreSQL\18\bin au Path de Variable systeme de l'ordinateur dans variable et environnement système. Puis il faut créé le schéma avec 'CREATE SCHEMA IF NOT EXISTS factorytasks_schema AUTHORIZATION factoryuser;'

FastAPI détermine la source de chaque paramètre en regardant le type et la position du paramètre dans la fonction. Grosso modo, il y a 4 grandes sources possibles :
- Path parameters (/tasks/{task_id})
- Query parameters (?name=value)
- Body JSON / Form data
- Headers, Cookies, Form, Files, Depends

Et parfois il faut le préciser dans la déclaration de la fonction juste après le @api machin
Car FastAPI hésite entre plusieurs options et prend la mauvaise source et forcément ne trouve pas ce qu'elle recherche.

Actuellement on a :
séparation models / schemas / database / main
PostgreSQL avec utilisateur dédié
schéma PostgreSQL dédié
PUT vs PATCH compris
response_model correct
Pydantic propre (from_attributes)
API cohérente


Strucure du projet: 

project_root/
├── app/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   ├── schemas/
│   └── routers/
└── tests/
    ├── conftest.py      # fixtures communes
    └── test_tasks.py    # tests CRUD pour les tasks

Etape: tests autoamtisé


