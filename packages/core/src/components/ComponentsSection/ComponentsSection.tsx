import { Box, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Highlight from 'react-highlight'

import { PrimaryLink } from './sample/PrimaryLink'

export function ComponentsSection() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Heading fontSize={'2.5rem'} fontWeight="black">
        Component Library
      </Heading>
      <Box display="flex" justifyContent="space-between">
        <Text
          fontSize={'1.2rem'}
          fontWeight="medium"
          color="gray.600"
          css={{ marginTop: '12px' }}
        >
          {`Add and edit your component library`}
        </Text>
      </Box>
      <Divider css={{ borderWidth: '2px', margin: '12px 0', width: '100%' }} />

      <Heading mb={3} fontSize={28} fontWeight="black">
        Primary Link
      </Heading>
      <Text>
        Use the Primary Link component for call to actions. Only use one primary
        link per page.
      </Text>
      <Box mt={5}>
        <Stack direction="column" spacing={12}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1 * 1,
            }}
          >
            <Box>
              <Box style={{ maxWidth: '50%' }}>
                <Highlight
                  className={'jsx'}
                >{`const commonClasses = "inline-flex items-center justify-center rounded px-3 py-1 font-bold focus:outline-none duration-500 sm:w-auto transition whitespace-nowrap";
const primaryClasses = classnames(
commonClasses,
"bg-gradient-primary hover:bg-gradient-primary-hover text-slate-1000 focus:ring-toxic-500 overflow-hidden"
);
                  
export function PrimaryLink({ children, className, to, ...props }: LinkProps) {
  return (
    <Link to={to} className={classnames(primaryClasses, className)} {...props}>
      {children}
    </Link>
  );
}             
`}</Highlight>
              </Box>
              <Box
                mt={10}
                style={{
                  maxWidth: '50%',
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
              >
                <PrimaryLink>Get started for free</PrimaryLink>
              </Box>
            </Box>
          </motion.div>
        </Stack>
      </Box>
    </motion.div>
  )
}
