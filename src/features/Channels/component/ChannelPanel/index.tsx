import React from 'react';

import Link from 'next/link';

import { IconElement } from '@/src/component/Element/Icon';
import { HikasenVtuber } from '@/src/features/Channels/types';

type Props = {
    channels: HikasenVtuber[];
    onhandler: () => void;
};

export const ChannelPanel = ({ channels, onhandler }: Props) => {
    const iconURL = process.env.NEXT_PUBLIC_CHANNEL_ICON_URL;

    return (
        <ul className="flex justify-center flex-wrap ml-10 mr-10 col-start-2 col-end-3 after:w-96 after:p-4 after:m-2">
            {channels.map((channel) => (
                <li
                    key={channel.channelID}
                    className="flex flex-col w-96 p-4 m-2 bg-gray-700 rounded-md">
                    <div className="grid grid-row-3 grid-flow-col gap-4">
                        <div className="row-span-3">
                            <button onClick={onhandler}>
                                {/* <IconElement
                                    src={`${iconURL}${channel.channelIconID}`}
                                    alt={`${channel.name}のチャンネルアイコン`}
                                    size="Medium"
                                    radius="full"
                                /> */}
                            </button>
                        </div>
                        <div className="row-span-1 col-span-2 mt-4 flex flex-col inline-block justify-center items-center \">
                            <button onClick={onhandler}>
                                <div className="flex flex-col">
                                    <span className="text-gray-100 font-sans text-lg">
                                        {channel.name}
                                    </span>
                                    <span className="text-gray-400 font-sans text-sm">
                                        Channel Name
                                    </span>
                                </div>
                            </button>
                            <span className="text-gray-400 font-sans text-xs">
                                Since 2013/8/24
                            </span>
                        </div>
                        <div className="row-span-2 col-span-2">
                            TAGTAGTAGTAGATGA
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
