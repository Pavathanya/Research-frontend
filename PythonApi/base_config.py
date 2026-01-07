import os
import logging

logger = logging.getLogger("base_config")

class AppConfig:
    # default model path (can be overridden)
    MODEL_PATH = os.path.join(os.path.dirname(__file__), 'Models', 'employee_attrition_model.pkl')

    @staticmethod
    def display_config():
        logger.info(f"AppConfig.MODEL_PATH = {AppConfig.MODEL_PATH}")
