type Recordable<T = any, K = string> = Record<K extends string | number | symbol ? K : string, T>
