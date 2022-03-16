from typing import Any, Dict

import msgpack

from fastapi import Response


class MsgpackResponse(Response):
    media_type = "application/msgpack"

    def render(self, content: Any) -> bytes:
        return msgpack.packb(content)


async def generate_mesh_response(plot_config: Dict, bp_file, variable: str):
    nodes_variable = plot_config["nodes"]
    connectivity_variable = plot_config["connectivity"]
    color_variable = plot_config["color"]
    x_label = plot_config["xlabel"]
    y_label = plot_config["ylabel"]
    title = plot_config["title"]

    nodes = bp_file.read(nodes_variable).tolist()
    connectivity = bp_file.read(connectivity_variable).tolist()
    color = bp_file.read(color_variable).tolist()

    mesh_json = {
        "connectivity": connectivity,
        "nodes": nodes,
        "color": color,
        "xlabel": x_label,
        "ylabel": y_label,
        "title": title,
    }

    return MsgpackResponse(content=mesh_json)
