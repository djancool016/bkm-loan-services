module.exports = {
    tableName: "register",
    timestamp: false,
    columns: [
        {
            columnName: "id",
            dataType: "INT",
            nullable: false,
            autoIncrement: true
        },
        {
            columnName: "description",
            dataType: "VARCHAR(255)",
            nullable: false
        }
    ]
}
