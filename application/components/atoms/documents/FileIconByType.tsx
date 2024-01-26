import React from 'react'
import { HStack, Spacer, Text, VStack, Pressable, Icon } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const FileIconByType = ({type}:{type:string}) => {
    if (type == "doc" || type == "docx") {
        return <Icon size="xl" as={Ionicons} name="document-outline" color="primary.text" />
    } else if (type == "xls" || type == "xlsx" || type == "csv") {
        return <Icon size="xl" as={AntDesign} name="exclefile1" color="primary.text" />
    } else if (type == "ppt" || type == "pptx") {
        return <Icon size="xl" as={AntDesign} name="pptfile1" color="primary.text" />
    } else if (type == "pdf") {
       return <Icon size="xl" as={AntDesign} name="pdffile1" color="primary.text" />
    } else if (type == "mp3" || type == "avi" || type == "mp4") {
        return <Icon size="xl" as={FontAwesome} name="file-audio-o" color="primary.text" />
    } else if (type == "jpg" || type == "jpeg") {
        return <Icon size="xl" as={AntDesign} name="jpgfile1" color="primary.text" />
    } else if (type == "png") {
        return <Icon size="xl" as={FontAwesome} name="file-image-o" color="primary.text" />
    } else if (type == "gif") {
        return <Icon size="xl" as={FontAwesome} name="file-image-o" color="primary.text" />
    } else if (type == "zip") {
        return <Icon size="xl" as={FontAwesome} name="file-zip-o" color="primary.text" />
    } else {
        return <Icon size="xl" as={AntDesign} name="file1" color="primary.text" />
    }
}

export default FileIconByType