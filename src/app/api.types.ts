export type Package = {
  id: string;
  weeklyDownloads: number;
  dependencyCount: number;
};

export type PackageMaybeWithDeps = Package & {
  dependencies?: string[];
};

export type GetPackages = Array<Package>;
export type GetDependencies = Array<string>;
