import React, {useState} from 'react'
import { Button, Header, Segment, Grid, Form, TextArea, Icon } from 'semantic-ui-react'
import Axios from 'axios';

function LandingPage() {

    const [Code, setCode] = useState("")
    const [RunButton, setRunButton] = useState('Run')
    const [Result, setResult] = useState('. . .')

    const editor = (event) => {
        if(event.keyCode===9){

            event.preventDefault();
            var v=event.currentTarget.value
            var s=event.currentTarget.selectionStart
            var e=event.currentTarget.selectionEnd;

            event.currentTarget.value=v.substring(0, s)+'\t'+v.substring(e);
            event.currentTarget.selectionStart=event.selectionEnd=s+1;
        }

    }

    const codeHandler = (event) => {
        setCode(event.currentTarget.value)
    }

    const test = (event) => {
        console.log(event)

        setRunButton(<Icon loading name='spinner' />)

        const body={
            code: Code
        }

        Axios.post('/api/compiler', body)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    //setResult(response.data)
                    var result = response.data.result;

                    setResult(result.split('\n').map((str, index) => <p key={index}>{str}</p>))

                } else {
                    alert('오류가 발생했습니다.')
                }

                setRunButton('Run')
            })
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <Header as='h1' dividing>
                <a href="/"> Python Complier Web App </a>
            </Header>
            <Grid doubling columns={2} >
            <Grid.Row stretched>
            <Grid.Column >
                <Segment >
                <Form action = "/" method="post">
                    <TextArea id="myCode" placeholder="# Enter your code" name="description" rows="20" onKeyDown={editor} onChange={codeHandler} value={Code} ></TextArea>
                </Form>
                <br />

                <Button primary onClick={test}>{RunButton}</Button>
                </Segment>
            </Grid.Column>

            <Grid.Column>
                <Segment>
                    {Result}
                </Segment>
            </Grid.Column>
            </Grid.Row>
            </Grid>
            
        </div>
    )
}

export default LandingPage