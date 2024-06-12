import React, { useEffect, useState } from 'react'
import {
    Box,
    Center,
    Container,
    HStack,
    Icon, Input, Pressable,
    Spacer,
    Text,
    VStack
} from 'native-base'
import UseLoadingService from 'application/store/services/UseLoadingService';
import WebLoading from 'application/components/atoms/WebLoading';
import UseEventService from 'application/store/services/UseEventService';
import in_array from "in_array";
import { Certificate } from 'application/models/certificate/Certificate';
import UseCertificateService from 'application/store/services/UseCertificateService';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Linking, Platform, useWindowDimensions } from 'react-native'
import { store } from 'application/store/Index'
import { getCertificatePdfApi } from 'application/store/api/Certificate.Api'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs'
import FindPath from 'application/utils/FindPath'
import SectionLoading from 'application/components/atoms/SectionLoading';
async function getCertificatePdf(certificate_id:any,attendee_id:any) {
    const mystate=store.getState()
    try {
        const response = await getCertificatePdfApi({certificate_id,attendee_id},mystate);
        downloadFile(response.data);
    } catch (error) {
        console.log('error', error);
    }
}
const downloadFile = (fileData:any) => {
    const blob = new Blob([fileData], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = "attendee_certificate.pdf";
    anchorElement.style.display = 'none';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(url);
};
const Index = React.memo(() => {
    const [breadcrumbs, setBreadcrumbs] = React.useState<Certificate[]>([]);
    const [selectedBreadcrumb, setSelectedBreadcrumb] = React.useState<Certificate | null>(null);
    const { processing } = UseLoadingService();
    const { event, modules } = UseEventService();
    const { certificate, data } = UseCertificateService();
    const {width}=useWindowDimensions();
    const [filteredCertificate, setFilteredCertificate] = React.useState<Certificate[]>([]);
    const [isLoading,setIsLoading]=useState(true)
    const [searchQuery, setSearchQuery] = useState('');
    const module = modules?.find((module) => module.alias === 'certificate');
    useEffect(() => {
        setFilteredCertificate(certificate);
        setIsLoading(false) 
    }, []);
    useEffect(() => {
        if (searchQuery) {
            const lowercasedFilter = searchQuery.toLowerCase();
            const filteredData = certificate.filter((item: Certificate) => {
                return (
                  (item.certificate_no && item.certificate_no.toString().includes(lowercasedFilter)) ||
                  (item.certificate?.name && item.certificate.name.toLowerCase().includes(lowercasedFilter))
                );
            });
            setFilteredCertificate(filteredData);
        } else {
            setFilteredCertificate(certificate);
        }
    }, [searchQuery, certificate]);
    return (
      <>
          {!in_array('certificate-listing', processing) && !isLoading ? (
                <>
                <NextBreadcrumbs module={module} />
                <Container mb={4} pt="2" maxW="100%" w="100%">
                    <HStack display={['block', 'flex']} mb="3" pt="2" w="100%" space="0" alignItems="center">
                        <Text fontSize="2xl">{module?.name ?? 'Certificate'}</Text>
                        <Spacer />
                        <Input
                          rounded="10"
                          w="60%"
                          maxW={290}
                          bg="primary.box"
                          borderWidth={0}
                          placeholder={event.labels.GENERAL_SEARCH}
                          value={searchQuery}
                          onChangeText={(text) => setSearchQuery(text)}
                          leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />}
                        />
                    </HStack>
                    <Box bg={'primary.box'} rounded={10} overflow="hidden" w={width<=356?"calc(100% - 22px)":"100%"} p="0">
                        {filteredCertificate.length > 0 ? (
                          filteredCertificate.map((cert, i) => (
                            <HStack key={cert.certificate_no} borderTopWidth={i === 0 ? 0 : 1} borderTopColor="primary.bordercolor" w="100%" px="4" py="4" space="3" alignItems="center">
                                <Icon size="xl" as={AntDesign} name="pdffile1" color="primary.text" />
                                <VStack space="0" w={'calc(100% - 100px)'}>
                                    <Text fontSize="md" textBreakStrategy='simple'>{cert?.certificate?.name}</Text>
                                    <Text fontSize="md" textBreakStrategy='simple'>ID: {cert.certificate_no}</Text>
                                </VStack>
                                <Spacer />
                                {cert?.certificate?.deleted_at == '' ? (
                                <Icon as={AntDesign} name="download" size="md" color="primary.text" onPress={() => {
                                    getCertificatePdf(cert?.certificate_id , cert?.attendee_id);
                                }} />
                                ) : ( ''
                                )}
                            </HStack>
                          ))
                        ) : (
                            <Box>
                            <Text p={4} rounded="10" fontSize="md">{event.labels.GENERAL_NO_RECORD}</Text>
                        </Box>
                        )}
                    </Box>
                </Container>
            </>
          ) : (
              <SectionLoading />
        
          )}
      </>
    );
});

export default Index;
