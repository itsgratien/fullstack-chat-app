import React from 'react';
import classname from 'classnames';
import style from './Home.module.scss';
import { PaperPlaneOutline } from 'react-ionicons';
import { useMutation, useSubscription } from '@apollo/client';
import * as Types from '__generated__';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const SendMessageSchema = object().shape({
  message: string().required('message is required'),
  receiver: string().required('receiver is required'),
});

interface Props {
  conversation?: string;
  receiver: Types.TReceiver;
  username: string;
}

export const WriteMessage = ({ conversation, receiver, username }: Props) => {
  const [placeholder, setPlaceholder] = React.useState<string>('write message');

  const [sendMessage] = useMutation<
    Types.TSendMessageResponse,
    Types.TSendMessageArgs
  >(Types.SEND_MESSAGE_GQL);

  const [handleWhoIsTyping] = useMutation<
    Types.THandleWhoIsTypingResponse,
    Types.THandleWhoIsTypingArgs
  >(Types.HANDLE_WHO_IS_TYPING_GQL, {
    onError: e => {
      console.log('whoIsTyping', e.message);
    },
  });

  const subscriptionResponse = useSubscription<Types.TGetWhoIsTypingResponse>(
    Types.GET_WHO_IS_TYPING_GQL
  );

  const handleSubmit = (values: Types.TSendMessageArgs) =>
    sendMessage({
      variables: { ...values, receiver: receiver.id, conversation },
    });

  const formik = useFormik({
    initialValues: { receiver: '', message: '' },
    validationSchema: SendMessageSchema,
    validateOnChange: true,
    onSubmit: handleSubmit,
  });

  const { values, errors } = formik;

  React.useEffect(() => {
    if (subscriptionResponse.data && subscriptionResponse.data.getWhoIsTyping) {
      setPlaceholder(subscriptionResponse.data.getWhoIsTyping.message);
    }
  }, [subscriptionResponse]);

  return (
    <div className={classname('w-full', style.writeMessage)}>
      <form
        onSubmit={formik.handleSubmit}
        className={classname('flex items-center')}
        autoComplete="off"
      >
        <textarea
          name="message"
          placeholder={placeholder}
          className={classname(
            'outline-none focus:outline-none',
            style.textarea,
            errors && errors.message
              ? 'border border-rose-600'
              : 'border border-gray-100'
          )}
          onChange={e => {
            handleWhoIsTyping({
              variables: {
                message: `${username} is typing ...`,
                receiver: receiver.id,
              },
            });
            formik.handleChange(e);
          }}
          value={values.message}
        ></textarea>
        <button
          type="submit"
          className={classname(
            'outline-none focus:outline-none bg-primary rounded-full flex items-center justify-center'
          )}
        >
          <PaperPlaneOutline color={'white'} />
        </button>
      </form>
    </div>
  );
};
