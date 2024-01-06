interface IBlogItem {
  type: string;
  value: any;
  attributes?: Attributes;
  language?: string;
  possibleInnerTags?: Array<IInnerTags>;
  changed: boolean;
  handlelangaugeselect?: (e: any, keyNum: number) => void;
}
