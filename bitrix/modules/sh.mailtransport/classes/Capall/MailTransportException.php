<?php
/**
 *
 * @package Capall_MailTransport
 */

/**
 *
 * @internal
 *
 * @author Alexey Shockov <alexey@shockov.com>
 * @package Capall_MailTransport
 */
class Capall_MailTransportException extends Exception
{
    /**
     * @var PEAR_Error
     */
    private $_pearError;
    /**
     *
     * @param PEAR_Error $error
     */
    public function __construct($error = null)
    {
        parent::__construct();

        $this->_pearError = $error;
    }
    /**
     * @return PEAR_Error
     */
    public function getPearError()
    {
        return $this->_pearError;
    }
    /**
	 * String representation (for example, to Bitrix event log).
	 *
	 * @return string
     */
    public function __toString()
    {
        $errorText = '';
        if ($this->_pearError) {
            $errorText .= '[PEAR Error] '.$this->_pearError;
        }

        return $errorText;
    }
}
