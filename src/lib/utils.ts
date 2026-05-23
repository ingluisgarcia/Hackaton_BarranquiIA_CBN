type ClassValue = string | boolean | undefined | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  return classes
    .flatMap((cls) => {
      if (Array.isArray(cls)) return cls;
      return cls ? [cls] : [];
    })
    .filter(Boolean)
    .join(" ");
}
