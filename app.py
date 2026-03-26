import streamlit as st
import requests

# create the title for the page
st.title("🤝 Your Personal Assistant")

# add subheader
st.subheader("What can your personal assistant do?")

# create a list of what your assistant can do
st.markdown("""
1. Answer questions on various topics.  
2. Arrange Calendar events and meetings.  
3. Read your emails and send replies, can even summarize them for you.  
4. Manage your tasks and to-do lists.  
5. Take quick notes for you.  
6. Track your expenses and budgeting.
""")

# add chats subheader
st.subheader("💬 Chat with your assistant")

# create a session state for message history
if "messages" not in st.session_state:
    st.session_state.messages = []

# show the messages in chat history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# create a chat input box
user_message = st.chat_input("Type your message...")

# if user sends a message
if user_message:

    # display user message
    with st.chat_message("user"):
        st.markdown(user_message)

    # save user message
    st.session_state.messages.append(
        {"role": "user", "content": user_message}
    )

    # send the user message to n8n webhook
    try:
        response = requests.post(
            "https://alwaysbehappy.app.n8n.cloud/webhook-test/70dd6b91-f571-430e-bdc6-b15f82d13886",
            json={"message": user_message},
            timeout=60  # wait up to 60 seconds for AI response
        )

        # check if the response was successful
        if response.status_code != 200:
            ai_response = f"⚠️ Webhook returned status {response.status_code}: {response.text[:200]}"
        elif not response.text.strip():
            ai_response = "⚠️ Webhook returned an empty response. The AI Agent may have errored in n8n — check the n8n execution log."
        else:
            data = response.json()

            # handle different JSON formats
            if isinstance(data, list) and len(data) > 0:
                ai_response = data[0].get("output", "No response from AI.")
            elif isinstance(data, dict):
                ai_response = data.get("output", "No response from AI.")
            else:
                ai_response = f"⚠️ Unexpected response format: {str(data)[:200]}"

    except requests.exceptions.Timeout:
        ai_response = "⚠️ Request timed out. The assistant is taking too long to respond."
    except Exception as e:
        ai_response = f"⚠️ Error contacting assistant: {e}"

    # display AI response
    with st.chat_message("assistant"):
        st.markdown(ai_response)

    # save AI response
    st.session_state.messages.append(
        {"role": "assistant", "content": ai_response}
    )