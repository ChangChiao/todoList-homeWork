import { InjectionKey, Ref } from 'vue';

export const isOpenMenuType: InjectionKey<Ref> = Symbol('isOpenMenu');
export const handleMenuType: InjectionKey<Function> = Symbol('handleMenu');