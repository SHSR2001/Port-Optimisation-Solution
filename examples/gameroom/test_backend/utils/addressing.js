// Copyright 2018-2020 Cargill Incorporated
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const crypto = require('crypto');
export const MESSAGE_NAME = "sawtooth_message";
export const MESSAGE_VERSION = "1.0";
export const MESSAGE_PREFIX = "b01374";
// The namespace registry prefix for global state (00ec00)
const NAMESPACE_REGISTRY_PREFIX = '00ec00';
// The contract prefix for global state (00ec02)
const CONTRACT_PREFIX = '00ec02';
// The contract registry prefix for global state (00ec01)
const CONTRACT_REGISTRY_PREFIX = '00ec01';
export function calculateGameAddress(gameName) {
    const gameNameHash = crypto.createHash('sha512').update(gameName).digest('hex');
    return `${MESSAGE_PREFIX}${gameNameHash.slice(0, 64)}`;
}
export function calculateNamespaceRegistryAddress(namespace) {
    const prefix = namespace.slice(0, 6);
    const hash = crypto.createHash('sha512').update(prefix).digest('hex').slice(0, 64);
    return `${NAMESPACE_REGISTRY_PREFIX}${hash}`;
}
export function computeContractAddress(name, version) {
    const input = `${name},${version}`;
    const hash = crypto.createHash('sha512').update(input).digest('hex').slice(0, 64);
    return `${CONTRACT_PREFIX}${hash}`;
}
export function computeContractRegistryAddress(name) {
    const hash = crypto.createHash('sha512').update(name).digest('hex').slice(0, 64);
    return `${CONTRACT_REGISTRY_PREFIX}${hash}`;
}