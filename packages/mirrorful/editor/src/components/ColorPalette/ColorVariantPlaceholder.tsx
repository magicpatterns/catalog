import { Box, Center, Text } from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'
import { handleInvalidColor } from "./utils"

export function ColorVariantPlaceholder ( { onClick, backgroundColorString }:{ onClick: () => void, backgroundColorString:string }) {
    backgroundColorString = handleInvalidColor(backgroundColorString)

    return (
        <Box css={{
            backgroundColor: backgroundColorString,
            width: 110,
            height: 110,
            padding: '16px 0',
            color: 'black',
            borderRadius: 8,
            marginRight: '24px',
            border: '1px dashed gray',
          }}
          onClick={onClick}
          >
            <Center><AddIcon/></Center>
            <Text css={{ textAlign:'center', paddingTop: '16px'}}>Add new variant</Text>            
        </Box>
    )
}