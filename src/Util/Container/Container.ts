'use strict';

import {ContainerInterface} from "./ContainerInterface";

export class Container implements ContainerInterface
{
    private items: any = [];

    /**
     * @param {string} key
     * @returns {any}
     */
    public get(key: string)
    {
        let item = this.items[key];

        if (item === undefined) {
            throw Error('Container: "' + key + '" not found!');
        } else if(typeof item === "function") {
            return item();
        }

        return item;

    }

    /**
     *
     * @param {string} key
     * @param value
     */
    public add(key: string, value: any)
    {
        this.items[key] = value;
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
    public has(key: string): boolean
    {
        return this.items.hasOwnProperty(key);
    }
}