import React, { useEffect } from 'react';
import {
    Box,
    Center,
    Container,
    HStack,
    Icon, Pressable,
    Spacer,
    Text,
    VStack
} from 'native-base'
import UseLoadingService from 'application/store/services/UseLoadingService';
import WebLoading from 'application/components/atoms/WebLoading';
import Search from 'application/components/atoms/documents/Search';
import UseEventService from 'application/store/services/UseEventService';
import in_array from "in_array";
import BannerAds from 'application/components/atoms/banners/BannerAds';
import { Certificate } from 'application/models/certificate/Certificate';
import UseCertificateService from 'application/store/services/UseCertificateService';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Linking, Platform } from 'react-native'
import { getContactSponsorApi } from 'application/store/api/Sponsor.api'
import { store } from 'application/store/Index'
import { getCertificatePdfApi } from 'application/store/api/Certificate.Api'
import IcoFacebook from 'application/assets/icons/small/IcoFacebook'
async function getCertificatePdf(certificate_id:any,attendee_id:any) {
    const mystate=store.getState()
    try {
        const response = await getCertificatePdfApi({certificate_id,attendee_id},mystate);

        downloadFile(response.data.data.file,response.data.data.filename);
    } catch (error) {
        console.log('error', error);
    }
}
const downloadFile = (fileData:any, filename:any) => {
    const blob = new Blob([fileData], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = filename;
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
    const [searchQuery, setSearch] = React.useState('');
    const { certificate, data } = UseCertificateService();
    const [filteredCertificate, setFilteredCertificate] = React.useState<Certificate[]>([]);

    console.log(certificate, 'in certificate');

    const module = modules?.find((module) => module.alias === 'certificate');

    return (
      <>
          {in_array('certificate', processing) ? (
            <WebLoading />
          ) : (
            <>
                <Container mb={4} pt="2" maxW="100%" w="100%">
                    <HStack display={['block', 'flex']} mb="3" pt="2" w="100%" space="0" alignItems="center">
                        <Text fontSize="2xl">{module?.name ?? 'Certificate'}</Text>
                        <Spacer />
                        <Search />
                    </HStack>
                    <Box bg={'primary.box'} rounded={10} overflow="hidden" w="100%" p="0">
                        {certificate.length > 0 ? (
                          certificate.map((cert,i) => (
                            <HStack key={cert.certificate_no} borderTopWidth={i === 0 ? 0 : 1} borderTopColor="primary.bordercolor" w="100%" px="4" py="4" space="3" alignItems="center">
                                <Icon size="xl" as={AntDesign} name="pdffile1" color="primary.text" />
                                <VStack space="0" w={'calc(100% - 100px)'}>
                                    <Text fontSize="md" textBreakStrategy='simple'>{cert?.certificate?.name}</Text>
                                    <Text fontSize="md" textBreakStrategy='simple'>ID: {cert.certificate_no}</Text>
                                </VStack>
                                <Spacer />
                                <Icon as={AntDesign} name="download" size="md" color="primary.text" onPress={() => {
                                    getCertificatePdf(cert?.certificate_id , cert?.attendee_id);
                                }} />
                                {/* <Pressable
                                  onPress={async () => {
                                      const url: any = `${detail?.detail?.facebook}`;
                                      const supported = await Linking.canOpenURL(url);
                                      if (supported) {
                                          await Linking.openURL(url);
                                      }
                                  }}>
                                </Pressable> */}
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
          )}
      </>
    );
});

export default Index;
