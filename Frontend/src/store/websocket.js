/** @flow */

import { Socket, Channel } from 'phoenix-socket';

export const socket = new Socket('ws://localhost:4000/socket');

socket.connect();

var channels = {};

export function channel(name: string): Promise {
    let channel = channels[name];
    if (typeof channel !== 'undefined') {
        return Promise.resolve(channel);
    }

    channel = socket.channel(name);
    return new Promise((resolve, reject) => {
        channel.join()
               .receive('ok', () => {
                   channels[name] = channel;
                   resolve(channel);
               })
               .receive('error', ({reason}) => reject(`cannot join because: ${reason}`))
               .receive('timeout', () => reject('timeout'));
    });
}
