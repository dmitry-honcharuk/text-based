export interface EntityDataMapper<EntityType, DataType> {
  fromEntityToData(entity: EntityType): DataType;

  fromDataToEntity(data: DataType): EntityType;
}
