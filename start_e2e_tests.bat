cd "C:\Users\marte\OneDrive\Documents\code\euro\db"
del euro_e2e_test_db
"..\..\..\sqlite\sqlite3" euro_e2e_test_db<create_euro_database.sql
cd "C:\Users\marte\OneDrive\Documents\code\euro\node"
node "./node_modules/mocha/bin/mocha" test_e2e --recursive
