
import React, { useEffect, useMemo, useState } from 'react'
import {Icon,Pressable, Spinner,} from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import useProgramService from 'application/store/services/UseProgramService';
import { FavProgram } from 'application/models/program/Program';
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from 'in_array';

type AppProps = {
    program_id: number,
}

const FavProgramToggle = ({program_id}:AppProps) => {
    const { MakeFavourite,fav_programs } = useProgramService();
    const {processing}=UseLoadingService();
    const calculatedValue=useMemo(() => {
        return fav_programs.some((fav:FavProgram) => fav.id === program_id && fav.is_fav);
    },[fav_programs]);

    const [isFav,setFav] = useState<boolean>(calculatedValue);

    function toggleFav(){
        if(in_array( `program-fav-${program_id}`,processing)){
            return;
        }
        setFav(!isFav);
        MakeFavourite({ program_id: program_id, screen: 'doesnt-matter' })
    }

return (
    <Pressable isDisabled={in_array(`program-fav-${program_id}`,processing)} onPress={() => toggleFav()}>
        {in_array(`program-fav-${program_id}`,processing) ? (
        <Spinner width={28} height={28} color={isFav ? 'secondary.500' : 'primary.text'} size="sm"  />
    ):(
        <Icon size="xl" as={AntDesign} name={isFav ? 'heart' : 'hearto'} color={isFav ? 'secondary.500' : 'primary.text'} />
    )}
    </Pressable>
)}

export default FavProgramToggle;