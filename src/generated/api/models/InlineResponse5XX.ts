/* tslint:disable */
/* eslint-disable */
/**
 * Team Sava React Home Assignment
 * API Specification for frontend challenge in Team Sava
 *
 * The version of the OpenAPI document: 0.1.9
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InlineResponse5XX
 */
export interface InlineResponse5XX {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse5XX
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse5XX
     */
    message?: string;
}

export function InlineResponse5XXFromJSON(json: any): InlineResponse5XX {
    return InlineResponse5XXFromJSONTyped(json, false);
}

export function InlineResponse5XXFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse5XX {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'Code') ? undefined : json['Code'],
        'message': !exists(json, 'Message') ? undefined : json['Message'],
    };
}

export function InlineResponse5XXToJSON(value?: InlineResponse5XX | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Code': value.code,
        'Message': value.message,
    };
}


