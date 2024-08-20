module.exports = {
    tableName: "transaction",
    timestamp: true,
    columns: [
        {
            columnName: "id",
            dataType: "INT",
            nullable: false,
            autoIncrement: true
        },
        {
            columnName: "registerId",
            dataType: "INT",
            nullable: false,
            references: {table: 'register', key: 'id'}
        },
        {
            columnName: "amount",
            dataType: "INT",
            nullable: false
        },
        {
            columnName: "date",
            dataType: "DATE",
            nullable: false
        },
        {
            columnName: "description",
            dataType: "VARCHAR(255)",
            nullable: false
        }
    ]
}
