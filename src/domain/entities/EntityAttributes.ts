export type EntityAttributes = Map<string, number>;

export type AttributeConfig = {
  name: string;
  value: number;
};

export function createEntityAttributes(
  config: AttributeConfig[],
): EntityAttributes {
  const attributes: EntityAttributes = new Map();

  for (const { name, value } of config) {
    attributes.set(name, value);
  }

  return attributes;
}
