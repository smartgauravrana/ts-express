import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

function routeBinder(method: string) {
  return function(path: string) {
    return function(target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    }
  }
}

export const get = routeBinder('get');
export const post = routeBinder('post');
export const put = routeBinder('put');
export const del = routeBinder('delete');
export const patch = routeBinder('patch');
