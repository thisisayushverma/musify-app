interface IHomeCardProps {
    _id: string;
    name: string;
    imgUrl: string;
    artist?: string;
}

interface IHomeListProps {
    name: string;
    list: IHomeCardProps[];
}

interface IEditInfoProps {
    setDialog:React.Dispatch<React.SetStateAction<boolean>>;
    playlistName:string;
    playlistDesc:string;
    isPrivate:boolean;
    playlistImage:File|null;
    setPlaylistName:React.Dispatch<React.SetStateAction<string>>;
    setPlaylistDesc:React.Dispatch<React.SetStateAction<string>>;
    setIsPrivate:React.Dispatch<React.SetStateAction<boolean>>;
    setPlaylistImage:React.Dispatch<React.SetStateAction<File|null>>;
}



interface ISearchSongsProps {
    _id: string;
    title: string;
    image_url: string;
    artist?: string;
    duration: number;
}

export type {
    IHomeCardProps,
    IHomeListProps,
    IEditInfoProps,
    ISearchSongsProps
};