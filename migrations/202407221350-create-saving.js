module.exports = {
    tableName: "saving",
    timestamp: true,
    columns: [
        {
            columnName: "id",
            dataType: "INT",
            nullable: false,
            autoIncrement: true
        },
        {
            columnName: "ksmId",
            dataType: "INT",
            nullable: false,
            references: {table: 'ksm', key: 'id'}
        },
        {
            columnName: "initialBalance",
            dataType: "INT",
            nullable: false,
            default: 0
        },
        {
            columnName: "startDate",
            dataType: "DATE",
            nullable: false
        },
        {
            columnName: "status",
            dataType: "ENUM('pending', 'active', 'closed')",
            nullable: false,
            default: 'pending',
        }
    ]
}
