module.exports = {
    tableName: "coa",
    timestamp: false,
    columns: [
        {
            columnName: "id",
            dataType: "INT",
            nullable: false,
            autoIncrement: true
        },
        {
            columnName: "accountId",
            dataType: "INT",
            nullable: false,
            references: {table: 'account', key:'id'}
        },
        {
            columnName: 'code',
            dataType: 'INT',
            nullable: false,
            unique: true
        },
        {
            columnName: "baseValue",
            dataType: "INT",
            nullable: false
        },
        {
            columnName: "description",
            dataType: "VARCHAR(255)",
            nullable: false
        }
    ]
}
