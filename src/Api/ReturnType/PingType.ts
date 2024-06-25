type PingType = {
    "ha": boolean,
    "version": string,
    "active_node": string,
    "install_uuid": string,
    "instances": [
        {
            "node": string,
            "node_type": string,
            "uuid": string,
            "heartbeat": string,
            "capacity": number,
            "version": string
        }
    ],
    "instance_groups": [
        {
            "name":  string,
            "capacity": number,
            "instances": [
                string
            ]
        }
    ]
}

