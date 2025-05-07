/**
 * UseActionStateHook
 * useActionState 用于缓存表单提交的状态。
 */
import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useActionState } from 'react';

// 模拟异步提交函数
async function submitForm(previousState, formData) {
  try {
    // 使用 axios 将 formData 提交到 /api/user/add
    const response = await axios.post('/api/user/add', formData);
    return { message: response.data.message }; // 返回成功消息
  } catch (error) {
    // 捕获错误并返回错误信息
    return { error: error.response?.data?.message || 'Something went wrong' };
  }
}

function UseActionStateHook() {
  const [state, formAction, isPending] = useActionState(submitForm, { error: null, message: null });
  const [form] = Form.useForm();

  const onFinish = (values) => {
    formAction(values);
  };

  useEffect(() => {
    console.log('state:', state); // 输出 state 变化
    // 根据 state 的内容处理成功或错误提示

    if (state.error) {
      alert(state.error); // 显示错误信息
    } else if (state.message) {
      alert(state.message); // 显示成功消息
    }
  }, [state]);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input the username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input the email!' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UseActionStateHook;